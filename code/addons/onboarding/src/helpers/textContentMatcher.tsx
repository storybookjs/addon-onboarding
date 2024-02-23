/**
 * Getting the deepest element that contain string / match regex even when it split between multiple elements
 *
 * @example
 * For:
 * <div>
 *   <span>Hello</span><span> World</span>
 * </div>
 *
 * screen.getByText('Hello World') // ❌ Fail
 * screen.getByText(textContentMatcher('Hello World')) // ✅ pass
 */
export function textContentMatcher(textMatch: string | RegExp) {
  const hasText =
    typeof textMatch === "string"
      ? (node: Element) => node.textContent === textMatch
      : (node: Element) => textMatch.test(node.textContent);

  const matcher = (_content: string, node: Element) => {
    if (!hasText(node)) {
      return false;
    }

    return Array.from(node?.children || []).every((child) => !hasText(child));
  };

  matcher.toString = () => `textContentMatcher(${textMatch})`;

  return matcher;
}
