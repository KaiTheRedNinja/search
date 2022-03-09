# search

Supercharge your searching with a simple cloudflare worker.

### Guide:

Add `https://search.alistair.sh/?q=` as a custom search engine to your browser. For Chrome, you would need to add `%s` on the end of that. Consult your browser's documentation for relavent information.

###### If building this project, install yarn (`brew install yarn`) and run using `npm run dev`.

#### Flags

#### Fallback Engines

If you prefer duckduckgo, you can add the following flag (`&engine=`) to your URL to have your searched routed through that instead:

```
https://search.alistair.sh/?q=%s&engine=https:%2f%2fduckduckgo.com%2f%3fq={q}
```

#### Multiple bangs

This is currently a BROKEN FEATURE, as I cannot find a way to open links in new tabs.

###### If you can find a way to do so (window.open() doesn't work for some reason)

Currently, I've set the `posBang` (positional bang) flag to true by default, meaning that bangs can be ANYWHERE, not just the front. If you want to revert to the old behaviour, put `&posBang=false` to the url

```
https://search.alistair.sh/?q=%s&posBang=false
```

The posBang flag is REQUIRED for multiple bangs to work.


###### Note that some browsers may react weirdly with `{q}`. If so, replace `{q}` with `%s`.

#### Visual Guide

###### note: URL here is outdated, you should replace `search.balls.workers.dev` with `search.alistair.sh` instead.

![First](./guide/01.png)
![Second](./guide/02.png)
![Third](./guide/03.png)
![Last](./guide/04.png)
