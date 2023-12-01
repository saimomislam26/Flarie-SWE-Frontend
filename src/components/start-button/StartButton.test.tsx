import '@testing-library/jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

import { StartButton } from './StartButton';
import { gameConfig } from '../../config/game-config';
import { TestElement } from '../../enums/TestElement';

afterEach(cleanup);

describe('[GAME] StartButton', () => {
  it('SHOULD Render StartButton with proper config', () => {

    const { getByTestId } = render(<StartButton />);

    // Get the StartButton element by data-testid
    const startButton = getByTestId(TestElement.START_BUTTON);

    // Assert styles based on the gameConfig
    expect(startButton).toHaveStyle({
      backgroundColor: '#34d399',
      color: '#022c22',
      position: 'absolute',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: '0.3s ease-in-out',
      fontWeight: 'bold',
      top: gameConfig.startButton.offsetTop,
      borderRadius: `${gameConfig.startButton.borderRadius}px`,
      height: `${gameConfig.startButton.height}px`,
      width: gameConfig.startButton.width,
      fontSize: `${gameConfig.startButton.fontSize}px`,
    });

    // Assert text content
    expect(startButton).toHaveTextContent(gameConfig.startButton.buttonText);

  });

  it('SHOULD Render StartButton with click event', () => {
    //
    // Mock the alert function
    const mockAlert = jest.spyOn(window, 'alert');
    mockAlert.mockImplementation(() => {});

    // Render the StartButton component
    const { getByTestId } = render(<StartButton />);

    // Get the StartButton element by data-testid
    const startButton = getByTestId(TestElement.START_BUTTON);

    // Simulate a click on the StartButton
    fireEvent.click(startButton);

    // Assert that the alert function has been called
    expect(mockAlert).toHaveBeenCalled();

    // Clean up the mock
    mockAlert.mockRestore();
  });
});
