export const metadata = {
  title: 'DevSprint Dashboard',
  description: 'AI-Powered Project Management Platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: '#f9fafb' }}>
        {children}
      </body>
    </html>
  )
}
