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

- Quote requests use a dedicated public server function and a fixed managed-email template recipient, with shared validation and retry idempotency; never expose a generic email-send endpoint.
- Managed email templates live in src/lib/email-templates; preserve sender-domain constants, entities aliases, and /lovable/ middleware bypasses so previews and email rendering work.
