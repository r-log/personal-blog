export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname.replace('/api/posts', '');

  switch (request.method) {
    case 'GET':
      return handleGet(path, env);
    case 'POST':
      return handlePost(request, env);
    case 'PUT':
      return handlePut(request, path, env);
    case 'DELETE':
      return handleDelete(path, env);
    default:
      return new Response('Method not allowed', { status: 405 });
  }
}

async function handleGet(path, env) {
  if (path) {
    const post = await env.BLOG_POSTS.get(path.substring(1));
    return new Response(post, { headers: { 'Content-Type': 'application/json' } });
  } else {
    const keys = await env.BLOG_POSTS.list();
    const posts = await Promise.all(keys.keys.map(key => env.BLOG_POSTS.get(key.name)));
    return new Response(JSON.stringify(posts.map(JSON.parse)), { headers: { 'Content-Type': 'application/json' } });
  }
}

async function handlePost(request, env) {
  const post = await request.json();
  post.id = crypto.randomUUID();
  await env.BLOG_POSTS.put(post.id, JSON.stringify(post));
  return new Response(JSON.stringify(post), { status: 201, headers: { 'Content-Type': 'application/json' } });
}

async function handlePut(request, path, env) {
  const post = await request.json();
  const id = path.substring(1);
  await env.BLOG_POSTS.put(id, JSON.stringify(post));
  return new Response(JSON.stringify(post), { headers: { 'Content-Type': 'application/json' } });
}

async function handleDelete(path, env) {
  const id = path.substring(1);
  await env.BLOG_POSTS.delete(id);
  return new Response(null, { status: 204 });
}
