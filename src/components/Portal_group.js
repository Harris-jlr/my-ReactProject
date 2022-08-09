import { Link } from 'react-router-dom'


const candidates = [
  {
    name: 'Emily Selman',
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
    name: 'Daniela Metz',
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
    name: 'Brenna Goyette',
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
                    <p className='text-center border-2 rounded-full px-4 w-auto font-medium text-base text-gray-500 border-gray-300'>Post Announcement</p>
                </div>
            </div>

            {/* start of the json loop for each card */}
            <ul className="mt-5 py-2 sm:mt-0 sm:border-t-0 sm:grid-cols-2 lg:grid-cols-3">
              {candidates.map((candidate) => (
                <li key={candidate.Email}>
                  <Link to="#" className="group block">
            <div class="grid max-w-lg gap-5 mx-auto mt-6 lg:grid-cols-3 lg:max-w-none">
              {/* <div class="flex flex-col overflow-hidden rounded-lg shadow-lg"> */}
                {/* <div class="flex-shrink-0">
                  <img class="object-cover w-full h-48" src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1679&amp;q=80" alt="" />
                </div> */}
                <div class="flex flex-col justify-between flex-1 p-6 bg-white">
                  <div class="flex-1">
                    <p class="text-sm font-medium text-indigo-600">
                      <Link to="#" class="hover:underline">Article</Link>
                    </p>
                    <Link to="#" class="block mt-2">
                    <p class="text-xl font-semibold text-gray-900">{candidate.Title}</p>
                    <p class="mt-3 text-base text-gray-500">{candidate.details}</p>
                    </Link>
                    </div>
                    <div class="flex items-center mt-6">
                    <div class="flex-shrink-0">
                    <Link to="#">
                    <span class="sr-only">{candidate.name}</span>
                    <img class="w-10 h-10 rounded-full" src={candidate.imageUrl} alt="" /></Link></div>
                    <div class="ml-3">
                    <p class="text-sm font-medium text-gray-900">
                    <Link to="#" class="hover:underline">{candidate.name}</Link></p>
                    <div class="flex space-x-1 text-sm text-gray-500">
                    <time dateTime={candidate.appliedDatetime}>{candidate.applied}</time><span aria-hidden="true"> · </span>
                    <span>6 min read </span></div></div></div></div></div>
                    
                    
            

            {/* Stacked list */}
            
                    <div class="grid max-w-lg gap-5 mx-auto mt-6 lg:grid-cols-3 lg:max-w-none">
                      <div class="flex flex-col overflow-hidden rounded-lg shadow-lg">
                        {/* card image */}
                        {/* <div class="flex-shrink-0">
                          <img class="object-cover w-full h-48" src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1679&amp;q=80" alt="" />
                        </div> */}
                        {/* Type of Announcment */}
                        <div class="flex flex-col justify-between p-6 bg-white">
                          <div class="flex-1">
                            <p class="text-sm font-medium text-indigo-600">
                              <Link to="#" class="hover:underline">Article</Link>
                            </p>
                            
                           {/* this is the div that holds and seperates the announcement and edit icons */}
                           <div className='flex-1'>
                                <div className='flex justify-between'>
                                    <div class="rounded-lg inline-flex p-3 bg-gray-50 text-gray-500 ring-4 ring-white">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg>
                                    </div>
                                    <div class="rounded-lg inline-flex p-3 text-gray-500 ring-4 ring-white">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                    </div>
                                </div>
                                <div className='flex'>
                                    <div className='flex flex-col'>
                                        <div className=''>
                                            <h2 className='text-left '>
                                                <span className="text-xl font-bold text-gray-900 ">{candidate.Title}</span>
                                            </h2>
                                        </div>
                                        <div className=''>
                                            <p className='pt-6'>
                                                <span className="text-sm font-lite text-gray-400  truncate"><time dateTime={candidate.appliedDatetime}>{candidate.applied}</time></span>
                                            </p>
                                        </div>
                                        <div className=''>
                                            <p className="mt-2 text-sm text-gray-500">
                                                <span className="flex-1 text-sm font-medium text-gray-500">{candidate.details}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                    </div></div></div></div>
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