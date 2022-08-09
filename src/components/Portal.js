import { Link } from 'react-router-dom'


const candidates = [
  {
    Title: 'General User Group Announcement',
    email: 'Kristin.Watson@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    applied: '05/28/2022',
    appliedDatetime: '2020-07-01T15:34:56',
    status: 'Completed phone screening',
    details: 'Etiam pretium mattis. Cras porttitor sodales rutrum. Vivamus malesuada dolor sagittis erat accumsan vehicula non vel orci. Proin fringilla pretium imperdiet. ',
  },
  {
    Title: 'General User Group Announcement',
    email: 'Esther.Howard@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    applied: '05/21/2022',
    appliedDatetime: '2020-07-01T15:34:56',
    status: 'Completed phone screening',
    details: 'Interdum et te ipsum primis in faucibus. Donec gravida nulla vitae ipsum auctor tincidunt. Proin pulvinar sit amet augue quis malesuada. ',
  },
  {
    Title: 'General User Group Announcement',
    email: 'Cody.Fisher@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    applied: '05/28/2022',
    appliedDatetime: '2020-07-01T15:34:56',
    status: 'Completed phone screening',
    details: 'Aliquam suscipit pharetra arcu. congue ligula sapien dictum, id pellentesque lacus dapibus. Praesent pellentesque venenatis odio, ut tincidunt turpis iaculi.',
  },
 
  // More candidates...
]

export default function Example() {

  return (
    <>
      <div className="min-h-full bg-gray-100 text-left">
        {/* Page heading */}
        <header className="bg-gray-100 text-left py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                User Group Portal
              </h1>
              <p className='py-4'>This is the Main Page of a family of Users' Group web sites for the Users of Mitsubishi Power gas and steam turbine generator systems.  The content is driven by each Users' Group and its' officers and is an independant forum managed for the benefit of the Users.</p>
            </div>
           
          </div>
        </header>

        <main className="pb-16">
          <div className="max-w-7xl mx-auto bg-gray-100 py-4 sm:px-6 lg:px-8">
            <div className="flex justify-between pt-2 px-4 sm:px-0">
                <div class="inline-flex">
                    <h2 className="text-xl text-left font-bold text-gray-900">Announcements</h2>
                </div>
                <div class="inline-flex">
                    <p className='text-center border-2 rounded-full px-2 w-64 font-medium text-base text-gray-500 border-gray-300'>Post Announcement</p>
                </div>
            </div>

            {/* Stacked list */}
            <ul className="mt-5 py-2 sm:mt-0 sm:border-t-0 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {candidates.map((candidate) => (
                <li key={candidate.Email}>
                  <Link to="#" className="group block">
                    <div className="flex items-center border-2 rounded-lg bg-white border-gray-100 h-164 sm:py-6 sm:px-0">
                      <div className="min-w-0 flex-1 flex items-center">
                        <div className="min-w-0 flex-1 px-4 text-left md:grid md:grid-cols-1 md:gap-4">
                          
                            <div className='flex justify-between pt-2 '>
                                <div class="rounded-lg inline-flex p-3 bg-gray-50 text-gray-500 ring-4 ring-white">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg>
                                </div>
                                <div class="rounded-lg inline-flex p-3 text-gray-500 ring-4 ring-white">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                </div>
                            </div>
                            <h2 className='text-left '>
                                <span className="text-xl font-bold text-gray-900 ">{candidate.Title}</span>
                            </h2>
                            <p className='pt-6'>
                                <span className="text-sm font-lite text-gray-400  truncate"><time dateTime={candidate.appliedDatetime}>{candidate.applied}</time></span>
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500">
                               <span className="text-sm font-medium text-gray-500">{candidate.details}</span>
                            </p>
                          
                        </div>
                      </div>
                    </div>
                 </Link>
                </li>
              ))}
            </ul>
         </div>
        </main>
      </div>
    </>
  )
}