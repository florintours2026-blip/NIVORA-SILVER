// Order notification blueprint. Connect Resend/SMTP or another transactional email provider.
import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
serve(async req=>{
  if(req.method==='OPTIONS') return new Response('ok',{headers:{'Access-Control-Allow-Origin':'*'}});
  const body=await req.json();
  // Provider-specific email sending should be added here using environment secrets.
  return new Response(JSON.stringify({ok:true,received:!!body.order_id}),{headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
});
