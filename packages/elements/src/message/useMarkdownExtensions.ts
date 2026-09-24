import type { Extensions, MarkdownProviderContext } from 'vue-stream-markdown'
import { beautifulMermaid } from '@stream-markdown/beautiful-mermaid'
import { code } from '@stream-markdown/code'
import { math } from '@stream-markdown/math'
import { mermaid } from '@stream-markdown/mermaid'
import { useMarkdownProvider } from 'vue-stream-markdown'

export function useMarkdownExtensions(): {
  provider: MarkdownProviderContext | undefined
  extensions: Extensions | undefined
} {
  const provider = useMarkdownProvider()
  const extensions = provider
    ? undefined
    : {
        code: code(),
        math: math(),
        beautifulMermaid: beautifulMermaid(),
        mermaid: mermaid(),
      }

  return { provider, extensions }
}
