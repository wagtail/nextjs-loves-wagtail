interface StreamFieldBlock {
  id: string;
  blockType: string;
  field: string;
}

interface RichTextBlockProps extends StreamFieldBlock {
  value: string;
}

const RichTextBlock = ({ blockType, value }: RichTextBlockProps) => {
  return (
    <div
      data-block-type={blockType}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
};

type AnyBlockProps = RichTextBlockProps | StreamFieldBlock;

const Fallback = ({ id, field, blockType }: StreamFieldBlock) => (
  <pre>{JSON.stringify({ id, field, blockType }, null, 2)}</pre>
);

const BLOCKS = {
  RichTextBlock: RichTextBlock,
} as const;
type BlockType = keyof typeof BLOCKS;

const StreamField = ({ stream }: { stream: AnyBlockProps[] }) => {
  if (!stream) {
    return null;
  }

  return (
    <>
      {stream.map((block, i) => {
        const Block = BLOCKS[block.blockType as BlockType] || Fallback;
        // @ts-ignore
        return <Block key={i} {...block} />;
      })}
    </>
  );
};

export default StreamField;
