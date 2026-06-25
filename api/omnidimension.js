const BASE_URL = 'https://backend.omnidim.io/api/v1';
const PAGE_SIZE_MAX = 150;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OMNIDIM_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured on server' });
  }

  const { action, agentId, pageno = '1', pagesize = '30', call_status } = req.query;

  if (!agentId) {
    return res.status(400).json({ error: 'Missing required parameter: agentId' });
  }

  const headers = { Authorization: `Bearer ${apiKey}` };

  try {
    let url;

    if (action === 'agent') {
      url = `${BASE_URL}/agents/${agentId}`;
    } else if (action === 'calls') {
      const clampedPageSize = Math.min(Number(pagesize) || 30, PAGE_SIZE_MAX);
      const params = new URLSearchParams({
        agentid: agentId,
        pageno: String(pageno),
        pagesize: String(clampedPageSize),
      });
      if (call_status && call_status !== 'all') {
        params.set('call_status', call_status);
      }
      url = `${BASE_URL}/calls/logs?${params}`;
    } else {
      return res.status(400).json({ error: `Unknown action: "${action}". Use "agent" or "calls".` });
    }

    const upstream = await fetch(url, { headers });

    let data;
    const contentType = upstream.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      data = await upstream.json();
    } else {
      const text = await upstream.text();
      data = { raw: text };
    }

    if (!upstream.ok) {
      return res.status(upstream.status).json({
        error: data?.detail || data?.message || data?.raw || 'Upstream API error',
      });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error('[omnidimension] Unhandled error:', err.message);
    return res.status(500).json({ error: 'Failed to reach Omnidimension API' });
  }
}
