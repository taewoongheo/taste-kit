import { Accordion, AccordionThemes, Text } from '@/components/ui';

export function AccordionDemo() {
  return (
    <>
      <Text variant="subtitle">Accordion</Text>
      <Accordion type="single" theme={AccordionThemes.light}>
        <Accordion.Item value="1">
          <Accordion.Trigger>
            <Text>첫 번째 항목</Text>
          </Accordion.Trigger>
          <Accordion.Content>
            <Text color="textSecondary">첫 번째 항목의 내용입니다.</Text>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="2">
          <Accordion.Trigger>
            <Text>두 번째 항목</Text>
          </Accordion.Trigger>
          <Accordion.Content>
            <Text color="textSecondary">두 번째 항목의 내용입니다.</Text>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="3" icon="cross">
          <Accordion.Trigger>
            <Text>세 번째 항목 (cross icon)</Text>
          </Accordion.Trigger>
          <Accordion.Content>
            <Text color="textSecondary">아이콘 스타일이 다른 항목입니다.</Text>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
