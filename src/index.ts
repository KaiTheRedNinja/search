import { SITES } from './links';

function encodeChars(text: string) {
	return text.replace(/( |\+)/g, encodeURIComponent);
}

function openInBackground(url: string) {
	// HELP!!!!! Please find a way to open URLs in the background.
	// for some reason it says window, open, etc. isn't defined and its driving me crazy.

	// window.open(url, "_new")
	// window.focus()
	return
}

function handleRequest(request: Request) {
	const url = new URL(request.url);

	const query = url.searchParams.get('q') ?? '';
	const querySplit = query.split(" ")
	const engine = (url.searchParams.get('engine') ?? SITES.google) as string;
	const posBang = (url.searchParams.get('posBang') ?? "true") as string;

	// check for positional bang = false
	var mainBang = ""
	if (posBang == 'true') {
		// get array of bangs
		var queryWords = ""
		var queryBangs = []

		for (const element of querySplit) {
			if (element.startsWith("!")) {
				queryBangs.push(element.substring(1, element.length))
			} else {
				// if the word is not a bang, add it to the words.
				queryWords = queryWords.concat(element).concat(" ")
			}
		}

		queryWords = queryWords.substring(0, queryWords.length - 1) // remove last character, a space.

		mainBang = (queryBangs.shift() ?? '').toLowerCase().replace('!', '')
		// if there are multiple bangs, the first one will be taken as "main"

		// open additional bangs in new tabs
		for (const bang of queryBangs) {
			const site = SITES[bang.toLowerCase()];
			if (site) {
				const parsed = typeof site === 'function' ? site(queryWords) : site;
				openInBackground(parsed.replace('{q}', encodeChars(queryWords)));
			}
		}
	} else {
		if (query.startsWith('!')) {
			mainBang = querySplit[0].toLowerCase().replace('!', '')
		}
	}

	// main bang
	const site = SITES[mainBang];
	if (site) {
		const parsed = typeof site === 'function' ? site(queryWords) : site;
		return Response.redirect(parsed.replace('{q}', encodeChars(queryWords)), 301);
	}

	return Response.redirect(engine.replace('{q}', encodeChars(queryWords)), 301);
}

addEventListener('fetch', event => {
	return event.respondWith(handleRequest(event.request));
});
