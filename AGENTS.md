<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Storefront architecture
- Keep Nishaan catalog data and WhatsApp order formatting in focused browser-safe modules so product browsing and click-to-chat ordering remain independently testable.
- Keep the brand's shareable About, FAQ, and Contact content on distinct TanStack routes, each with its own metadata, for direct linking and discovery.
