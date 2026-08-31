<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CollapsibleContent } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { beautifulMermaid } from '@stream-markdown/beautiful-mermaid'
import { code } from '@stream-markdown/code'
import { math } from '@stream-markdown/math'
import { mermaid } from '@stream-markdown/mermaid'
import { computed, useSlots } from 'vue'
import { Markdown } from 'vue-stream-markdown'
import 'katex/dist/katex.min.css'
import 'vue-stream-markdown/index.css'
import 'vue-stream-markdown/theme.css'

interface Props {
  class?: HTMLAttributes['class']
  content: string
}

const props = defineProps<Props>()
const slots = useSlots()

const extensions = {
  code: code({ theme: ['github-light', 'github-dark'] }),
  math: math(),
  beautifulMermaid: beautifulMermaid(),
  mermaid: mermaid(),
}

const slotContent = computed<string | undefined>(() => {
  const nodes = slots.default?.()
  if (!Array.isArray(nodes)) {
    return undefined
  }
  let text = ''
  for (const node of nodes) {
    if (typeof node.children === 'string')
      text += node.children
  }
  return text || undefined
})

const md = computed(() => (slotContent.value ?? props.content ?? '') as string)
</script>

<template>
  <CollapsibleContent
    :class="cn(
      'mt-4 text-sm',
      'data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2',
      'data-[state=open]:slide-in-from-top-2 text-muted-foreground',
      'outline-none data-[state=closed]:animate-out data-[state=open]:animate-in',
      props.class,
    )"
  >
    <Markdown :content="md" :extensions="extensions" />
  </CollapsibleContent>
</template>
