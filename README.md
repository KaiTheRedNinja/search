# search

Supercharge your searching with a simple cloudflare worker.

### Guide:

Add `https://search.alistair.sh/?q=` as a custom search engine to your browser. For Chrome, you would need to add `%s` on the end of that. Some browsers may also react weirdly with `{q}`. If so, replace `{q}` with `%s`.

Consult your browser's documentation for relavent information.

###### If building this project, install yarn (`brew install yarn`) and run using `npm run dev`.

#### Flags:

##### Fallback Engines

If you prefer duckduckgo, you can add the following flag (`&engine=`) to your URL to have your searched routed through that instead:

```
https://search.alistair.sh/?q=%s&engine=https:%2f%2fduckduckgo.com%2f%3fq={q}
```

##### Bangs everywhere

Currently, I've set the `posBang` (positional bang) flag to true by default.

`posBang` set to true means bangs can be ANYWHERE, not just the front. If you want to revert to the old behaviour, put `&posBang=false` to the url.

```
https://search.alistair.sh/?q=%s&posBang=false
```

Example usage: `test !google` instead of `!google test`

##### Multiple bangs

*This is currently a BROKEN FEATURE, as I cannot find a way to open links in new tabs. If you can find a way to open URLs in background tabs, put the code in* `openInBackground(url: string)`

The `mulBang` (multiple bang) flag is `false` by default because it doesn't work.

If `openInBackground(url: string)` worked it would allow for you to put multiple bangs in a query, eg. `test !google !bing !wikipedia`. The page would redirect to Google, but bing and wikipedia would open in the background.

The `posBang` flag is REQUIRED to be `true` for multiple bangs to work.

#### Visual Guide

###### note: URL here is outdated, you should replace `search.balls.workers.dev` with `search.alistair.sh` instead.

![First](./guide/01.png)
![Second](./guide/02.png)
![Third](./guide/03.png)
![Last](./guide/04.png)
