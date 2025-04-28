export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background border-t py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold">Imed Khed</h3>
            <p className="text-muted-foreground mt-2">Aeronautical Engineer & Web Developer</p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <p className="text-sm text-muted-foreground">&copy; {currentYear} Imed Khed. All rights reserved.</p>
            <p className="text-sm text-muted-foreground mt-1">Designed and built with Next.js and Three.js</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
