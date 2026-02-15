import { render, screen } from '@testing-library/react-native';
import { Dialog } from '../dialog';

jest.mock('react-native-gesture-handler', () => {
  const actual = jest.requireActual('react-native-gesture-handler');
  return {
    ...actual,
    GestureDetector: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('Dialog', () => {
  const onDismiss = jest.fn();

  beforeEach(() => onDismiss.mockClear());

  it('renders title and message when visible', () => {
    render(
      <Dialog
        visible={true}
        onDismiss={onDismiss}
        title="삭제하시겠습니까?"
        message="이 작업은 되돌릴 수 없습니다."
        actions={[{ label: '확인', onPress: jest.fn() }]}
      />,
    );
    expect(screen.getByText('삭제하시겠습니까?')).toBeTruthy();
    expect(screen.getByText('이 작업은 되돌릴 수 없습니다.')).toBeTruthy();
  });

  it('renders action buttons', () => {
    render(
      <Dialog
        visible={true}
        onDismiss={onDismiss}
        title="확인"
        actions={[
          { label: '취소', onPress: jest.fn(), variant: 'ghost' },
          { label: '삭제', onPress: jest.fn(), variant: 'destructive' },
        ]}
      />,
    );
    expect(screen.getByText('취소')).toBeTruthy();
    expect(screen.getByText('삭제')).toBeTruthy();
  });

  it('renders without message', () => {
    render(
      <Dialog
        visible={true}
        onDismiss={onDismiss}
        title="제목만"
        actions={[{ label: '확인', onPress: jest.fn() }]}
      />,
    );
    expect(screen.getByText('제목만')).toBeTruthy();
  });
});
