export const parseMarkdown = (text: string) => {
  // Code blocks (```language\ncode```)
  text = text.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) => {
    const language = lang ? `<div class="text-xs text-gray-400 mb-2">${lang}</div>` : '';
    return `<pre class="relative my-4 p-4 bg-gray-200 rounded-lg overflow-x-auto">${language}<code class="text-sm font-mono text-gray-50">${code.trim()}</code></pre>`;
  });

  // Inline code (`code`)
  text = text.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 mx-0.5 bg-gray-700 rounded text-sm font-mono text-gray-50">$1</code>');

  // Bold (**text** or __text__)
  text = text.replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>');

  // Italic (*text* or _text_)
  text = text.replace(/(\*|_)(.*?)\1/g, '<em>$2</em>');

  // Links ([text](url))
  text = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Newlines (outside of code blocks)
  text = text.replace(/\n/g, '<br />');

  return text;
};
