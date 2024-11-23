# Text to Visual Comparison

A modern web application that transforms text comparisons into beautiful visual representations. Built with Next.js, React, and Tailwind CSS.

## Features

- Transform text comparisons into interactive visualizations
- Multiple visualization layouts:
  - Side by Side
  - Process Flow
  - Flower Pattern
  - Orbital View
  - Fan Layout
  - Balance Scale
- Customizable styles:
  - Color schemes
  - Font sizes
  - Layout options
- Keyboard shortcuts for quick actions
- Local storage for saving preferences
- Responsive design for all devices
- Dark mode by default

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd text-comparison-visualizer
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter your comparison text in the input area

   - Use clear, structured text
   - Include two subjects to compare
   - List aspects of comparison

2. Click "Transform" or use Ctrl/Cmd + Enter

   - The text will be analyzed and transformed
   - A visualization will be generated

3. Customize the visualization

   - Choose from different layouts
   - Select color schemes
   - Adjust font sizes

4. Export or share your visualization
   - Save as image (coming soon)
   - Share via link (coming soon)

## Example Input Format

```text
Comparing Cats and Dogs

Cats:
Independent, groom themselves, quiet, indoor-oriented

Dogs:
Loyal, need walking, protective, social

Aspects:
- Maintenance: Self-grooming vs Regular grooming needed
- Exercise: Minimal needs vs Daily walks required
- Social: Independent vs Pack-oriented
- Space: Adaptable to small spaces vs Needs more room
```

## Keyboard Shortcuts

- `Ctrl/Cmd + Enter`: Transform text
- `Ctrl/Cmd + S`: Save/Export (coming soon)
- `Ctrl/Cmd + R`: Reset view (coming soon)

## Project Structure

```
src/
├── app/                    # Next.js app directory
├── components/
│   ├── features/          # Feature components
│   │   ├── text-input/    # Text input components
│   │   └── visualization/ # Visualization components
│   └── ui/               # Shared UI components
├── lib/                   # Utilities and helpers
│   ├── hooks/            # Custom React hooks
│   ├── styles.ts         # Style utilities
│   ├── types.ts          # TypeScript types
│   ├── utils.ts          # General utilities
│   └── storage.ts        # Local storage handling
```

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- Local Storage API - State persistence

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by various visualization techniques and comparison tools
- Built with modern web development best practices
- Designed for accessibility and user experience

## Future Enhancements

- Additional visualization layouts
- Export to various formats
- Sharing capabilities
- Collaborative editing
- Custom themes
- Mobile app version

## Support

For support, please open an issue in the repository or contact the maintainers.
