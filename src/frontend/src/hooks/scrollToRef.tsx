export function scrollToRef (ref: React.RefObject<HTMLDivElement | null>) {
  if (!ref.current) return;
  const scrollContainer = ref.current.closest('.overflow-y-auto') as HTMLElement;
  if (!scrollContainer) return;

  const containerTop = scrollContainer.getBoundingClientRect().top;
  const elementTop = ref.current.getBoundingClientRect().top;
  const offset = elementTop - containerTop + scrollContainer.scrollTop;

  scrollContainer.scrollTo({ top: offset, behavior: 'smooth' });
};