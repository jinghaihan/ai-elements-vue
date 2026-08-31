<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
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
  content?: string
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const extensions = {
  code: code({ theme: ['github-light', 'github-dark'] }),
  math: math(),
  beautifulMermaid: beautifulMermaid(),
  mermaid: mermaid(),
}

const slots = useSlots()
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
  <Markdown
    :content="md"
    :extensions="extensions"
    :class="
      cn(
        'size-full [&>*:first-child]:mt-0! [&>*:last-child]:mb-0!',
        props.class,
      )
    "
    v-bind="$attrs"
  />
</template>
