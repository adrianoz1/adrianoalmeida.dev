import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Box, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import type { BlogPostHeading } from '../../lib/blog'

interface PostTocProps {
  headings: BlogPostHeading[]
}

export function PostToc({ headings }: PostTocProps) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? '')
  const primaryText = useColorModeValue('textPrimary', 'textPrimary')
  const mutedText = useColorModeValue('tocMuted', 'tocMuted')
  const borderColor = useColorModeValue('borderSubtle', 'borderSubtle')

  const headingIds = useMemo(() => headings.map((heading) => heading.id), [headings])

  useEffect(() => {
    if (headingIds.length === 0) {
      return
    }

    const headingElements = headingIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element))

    if (headingElements.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top)

        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id)
        }
      },
      {
        rootMargin: '-20% 0px -65% 0px',
        threshold: [0, 1],
      }
    )

    for (const element of headingElements) {
      observer.observe(element)
    }

    const onScroll = () => {
      const headingsAboveViewport = headingElements.filter((element) => element.getBoundingClientRect().top <= 140)
      const currentHeading = headingsAboveViewport[headingsAboveViewport.length - 1]

      if (currentHeading) {
        setActiveId(currentHeading.id)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [headingIds])

  if (headings.length === 0) {
    return null
  }

  return (
    <Box
      position="sticky"
      top="2rem"
      pl="6"
      borderLeft="1px solid"
      borderColor={borderColor}
    >
      <Stack spacing="4">
        <Text color={primaryText} fontSize="sm" fontWeight="700" textTransform="uppercase" letterSpacing="0.08em">
          Nesta página
        </Text>

        <Stack spacing="2.5">
          {headings.map((heading) => {
            const isActive = heading.id === activeId

            return (
              <Link key={heading.id} href={`#${heading.id}`} passHref legacyBehavior>
                <Text
                  as="a"
                  color={isActive ? primaryText : mutedText}
                  fontSize={heading.level === 2 ? 'md' : 'sm'}
                  fontWeight={isActive ? '700' : '500'}
                  lineHeight="1.55"
                  pl={heading.level === 3 ? '4' : '0'}
                  position="relative"
                  transition="color 0.2s ease"
                  _hover={{ color: primaryText }}
                >
                  {isActive ? (
                    <Box
                      position="absolute"
                      left={heading.level === 3 ? '1' : '-3'}
                      top="0.7em"
                      width={heading.level === 3 ? '1.5' : '2'}
                      height="2px"
                      bg="brand.300"
                    />
                  ) : null}
                  {heading.text}
                </Text>
              </Link>
            )
          })}
        </Stack>
      </Stack>
    </Box>
  )
}
