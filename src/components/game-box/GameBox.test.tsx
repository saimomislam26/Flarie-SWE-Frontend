import { cleanup } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GameBox } from './GameBox';
import { gameConfig } from '../../config/game-config';
import { TestElement } from '../../enums/TestElement';
afterEach(cleanup);

describe('[GAME] GameBox', () => {
  it('SHOULD Render GameBox with width maxHeight and maxWidth WHEN browsers viewport width and height is 1000px', () => {
    // Mocking window.innerWidth and window.innerHeight to simulate a viewport size of 1000px x 1000px
    global.innerWidth = 1000;
    global.innerHeight = 1000;

    const { container } = render(<GameBox>Content</GameBox>);

    // Calculate expected dimensions based on the proportional design rules
    const expectedWidth = gameConfig.container.maxWidth; // Original maxWidth
    const expectedHeight = gameConfig.container.maxHeight;; // Original maxHeight

    // Assert styles based on the updated gameConfig for the ContainerStyled component
    const containerStyled = container.firstChild;

    expect(containerStyled).toHaveStyle('width: ' + `${expectedWidth}px`);
    expect(containerStyled).toHaveStyle('height: ' + `${expectedHeight}px`);
    expect(containerStyled).toHaveStyle('max-width: ' + `${expectedWidth}px`);
    expect(containerStyled).toHaveStyle('max-height: ' + `${expectedHeight}px`);
    expect(containerStyled).toHaveStyle(
      'border-radius: ' + `${gameConfig.container.borderRadius}px`
    );

    // Assert data-testid attribute
    expect(containerStyled).toHaveAttribute('data-testid', TestElement.GAME_BOX);
  });

  it('SHOULD Render GameBox with width 300px WHEN browsers viewport width 300px and height remains 1000px', () => {

    // Mocking window.innerWidth and window.innerHeight to simulate a viewport size of 300px x 1000px
    global.innerWidth = 300;
    global.innerHeight = 1000;

    const { container } = render(<GameBox>Content</GameBox>);

    const expectedWidth = 300; 

    // Assert styles based on the updated gameConfig for the ContainerStyled component
    const containerStyled = container.firstChild;

    expect(containerStyled).toHaveStyle('width: ' + `${expectedWidth}px`);

    // Assert data-testid attribute
    expect(containerStyled).toHaveAttribute('data-testid', TestElement.GAME_BOX);

  });

  it('SHOULD Render GameBox with height 600px WHEN browsers viewport width 1000px and height is 600px', () => {
    //
    global.innerWidth = 1000;
    global.innerHeight = 600;

    const { container } = render(<GameBox>Content</GameBox>);

    const containerStyled = container.firstChild;

    expect(containerStyled).toHaveStyle('height: 600px');

    // Assert data-testid attribute
    expect(containerStyled).toHaveAttribute('data-testid', TestElement.GAME_BOX);
  });
});
