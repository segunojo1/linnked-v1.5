export const formatMessage = (text?: string) => {
  if (!text) return []; // Return an empty array if text is undefined

  return text.split(/\n\n+/).map((paragraph) => paragraph.trim()); // Split at double newlines and trim extra spaces
};
