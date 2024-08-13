# JavaScript Paint Application with Canvas

This project is a simple paint application that uses the HTML canvas element, JavaScript, and Tailwind CSS. The application allows users to draw, erase, and fill colors on the canvas. It also includes options for adjusting brush and eraser sizes, saving the drawing, and downloading it.

## Installation

Before you start, make sure to install the necessary Node packages, including Tailwind CSS. Run the following command:

```bash
npm install
```

### Key Features of the Paint Application

- **Canvas Setup**: Initializes the canvas size and sets up the drawing environment.
- **Tool Selection**:
  - **Brush**: Allows drawing on the canvas.
  - **Eraser**: Enables erasing parts of the drawing.
  - **Paint Fill**: Fills an area with a selected color using a flood fill algorithm.
- **Brush and Eraser Size Adjustment**: Allows the user to change the size of the brush and eraser tools.
- **Color Selection**: Users can choose colors for the brush using a color grid and custom color input.
- **Drawing and Erasing**: Tracks mouse movements and applies brush strokes or erases accordingly.
- **Flood Fill Algorithm**: Implements a flood fill algorithm for the paint bucket tool to fill enclosed areas.
- **Saving and Downloading**: Supports saving the canvas as an image in local storage or downloading it.
- **Clearing the Canvas**: Provides an option to clear the entire canvas.
- **Responsive Design**: Resizes the canvas based on window size.
