import { InteractionResponseType } from 'discord-api-types/v9';
import { verifyKey } from 'discord-interactions';

export const reply = (response: Record<string, any>, type: InteractionResponseType, status: number = 200) =>
	new Response(JSON.stringify({ ...response, type }), {
		status,
		headers: {
			'content-type': 'application/json'
		}
	});

export const verifyRequest = async (req: Request) => {
	const sig = req.headers.get('X-Signature-Ed25519');
	const timestamp = req.headers.get('X-Signature-Timestamp');
	if (!sig || !timestamp || !req.body)
		return false
	const rawBody = await req.clone().arrayBuffer();
	if (!verifyKey(rawBody, sig, timestamp, DISCORD_PUBLIC_KEY))
		return false

	return void 0;
};
