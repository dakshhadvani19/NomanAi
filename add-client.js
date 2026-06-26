/* global process */
import { readFileSync } from 'node:fs';
import { initializeApp, cert, applicationDefault, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

const USAGE = `
Usage:
  node add-client.js \\
    --agentId 199215 \\
    --agentName "Property Inquiry Handler Hyd (01)" \\
    --clientName "Ajay Indukuri" \\
    --emails "a@gmail.com,b@gmail.com"

Credentials (pick one):
  1) FIREBASE_SERVICE_ACCOUNT_PATH=C:\\path\\service-account.json
  2) FIREBASE_SERVICE_ACCOUNT_JSON='{"project_id":"...","client_email":"...","private_key":"..."}'
  3) FIREBASE_PROJECT_ID + FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY
  4) GOOGLE_APPLICATION_CREDENTIALS (application default credentials)
`;

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith('--')) continue;
    const key = token.slice(2);

    if (key === 'email') {
      const value = argv[i + 1];
      if (value && !value.startsWith('--')) {
        out.email = out.email || [];
        out.email.push(value);
        i += 1;
      }
      continue;
    }

    const value = argv[i + 1];
    if (value && !value.startsWith('--')) {
      out[key] = value;
      i += 1;
    } else {
      out[key] = true;
    }
  }
  return out;
}

function parseEmails(args) {
  const fromList = typeof args.emails === 'string'
    ? args.emails.split(',').map((e) => e.trim()).filter(Boolean)
    : [];
  const fromFlags = Array.isArray(args.email)
    ? args.email.map((e) => String(e).trim()).filter(Boolean)
    : [];

  const emails = [...new Set([...fromList, ...fromFlags].map((e) => e.toLowerCase()))];
  const invalid = emails.filter((e) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));

  if (!emails.length) {
    throw new Error('Please provide at least one email using --emails or repeated --email');
  }
  if (invalid.length) {
    throw new Error(`Invalid email(s): ${invalid.join(', ')}`);
  }
  return emails;
}

function getCredential() {
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  if (serviceAccountPath) {
    const raw = readFileSync(serviceAccountPath, 'utf8');
    return cert(JSON.parse(raw));
  }

  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (serviceAccountJson) {
    return cert(JSON.parse(serviceAccountJson));
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  if (projectId && clientEmail && privateKey) {
    return cert({
      projectId,
      clientEmail,
      privateKey: privateKey.replace(/\\n/g, '\n'),
    });
  }

  return applicationDefault();
}

async function upsertAgentClient() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || args.h) {
    console.log(USAGE);
    process.exit(0);
  }

  const agentIdRaw = args.agentId;
  const agentName = args.agentName;
  const clientName = args.clientName;
  const emails = parseEmails(args);

  if (!agentIdRaw || !agentName || !clientName) {
    throw new Error('Missing required args: --agentId, --agentName, --clientName');
  }

  const agentId = Number(agentIdRaw);
  if (!Number.isInteger(agentId) || agentId <= 0) {
    throw new Error(`agentId must be a positive integer. Received: "${agentIdRaw}"`);
  }

  if (!getApps().length) {
    initializeApp({ credential: getCredential() });
  }
  const db = getFirestore();

  const payload = {
    agentId,
    agentName: agentName.trim(),
    clientName: clientName.trim(),
    allowedEmails: emails,
    updatedAt: FieldValue.serverTimestamp(),
  };

  await db.collection('agents').doc(String(agentId)).set(payload, { merge: true });

  console.log('✅ Firestore upsert successful');
  console.log(JSON.stringify({ docId: String(agentId), ...payload, updatedAt: 'serverTimestamp()' }, null, 2));
}

upsertAgentClient().catch((error) => {
  console.error('❌ Failed to upsert client in Firestore');
  console.error(error.message || error);
  console.error('\n' + USAGE);
  process.exit(1);
});
