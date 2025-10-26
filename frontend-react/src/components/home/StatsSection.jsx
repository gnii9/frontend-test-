export default function StatsSection() {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-5xl font-bold text-primary">25,000+</p>
            <p className="text-gray-700 dark:text-gray-300">Ký hiệu</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-secondary">450,000+</p>
            <p className="text-gray-700 dark:text-gray-300">Học viên</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-accent">5,000+</p>
            <p className="text-gray-700 dark:text-gray-300">Chuyên gia</p>
          </div>
        </div>
      </div>
    </section>
  )
}