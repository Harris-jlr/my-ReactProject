import { Fragment, useState } from 'react'
import { Listbox, Menu, Transition } from '@headlessui/react'
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  LinkIcon,
  MailIcon,
  PencilIcon,
  
} from '@heroicons/react/solid'

import { Link } from 'react-router-dom'

const tabs = [
  { name: 'Applied', href: '#', count: '2', current: false },
  { name: 'Phone Screening', href: '#', count: '4', current: false },
  { name: 'Interview', href: '#', count: '6', current: true },
  { name: 'Offer', href: '#', current: false },
  { name: 'Disqualified', href: '#', current: false },
]
const candidates = [
  {
    name: 'Kristin Watson',
    email: 'Kristin.Watson@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    applied: '05/28/2022  10:21 AM',
    appliedDatetime: '2020-07-01T15:34:56',
    status: 'Completed phone screening',
    Question: 'Etiam pretium mattis ullamcorper. Cras porttitor sodales rutrum. Vivamus malesuada dolor sagittis erat accumsan vehicula non vel orci. Proin fringilla pretium imperdiet. ',
  },
  {
    name: 'Esther Howard',
    email: 'Esther.Howard@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    applied: '05/21/2022  11:30 AM',
    appliedDatetime: '2020-07-01T15:34:56',
    status: 'Completed phone screening',
    Question: 'Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec gravida nulla vitae ipsum auctor tincidunt. Proin pulvinar sit amet augue quis malesuada. ',
  },
  {
    name: 'Cody Fisher',
    email: 'Cody.Fisher@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    applied: '05/28/2022  10:21 AM',
    appliedDatetime: '2020-07-01T15:34:56',
    status: 'Completed phone screening',
    Question: 'Aenean ornare augue sed diam vulputate ultricies. Aliquam suscipit pharetra arcu. Fusce congue ligula at sapien dictum, id pellentesque lacus dapibus. Praesent pellentesque venenatis odio, ut tincidunt turpis iaculis ac.',
  },
  {
    name: 'Emily Selman',
    email: 'emily.selman@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    applied: '05/28/2022  10:21 AM',
    appliedDatetime: '2020-07-01T15:34:56',
    status: 'Completed phone screening',
    Question: 'Donec sit amet diam at est sodales dignissim. Proin vulputate ex non ex auctor, et consequat neque fermentum. Phasellus vestibulum nisi massa, sed imperdiet tortor eleifend a. Praesent mattis sit amet turpis at aliquam. Fusce gravida ligula ut ultricies ullamcorper. In vitae augue non mauris luctus lobortis vel posuere magna. Ut finibus nunc non massa vestibulum fringilla. Sed nec lacinia ex, quis lobortis lacus. Fusce viverra velit scelerisque porta pulvinar.',
  },
  {
    name: 'Jane Cooper',
    email: 'Jane.Cooper@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    applied: '05/21/2022  11:30 AM',
    appliedDatetime: '2020-07-01T15:34:56',
    status: 'Completed phone screening',
    Question: 'Kevin capicola sausage, buffalo bresaola venison turkey shoulder picanha ham pork tri-tip meatball meatloaf ribeye. Doner spare ribs andouille bacon sausage. Ground round jerky brisket pastrami shank.',
  },
  // More candidates...
]
const publishingOptions = [
  { name: 'Published', description: 'This job posting can be viewed by anyone who has the link.', current: true },
  { name: 'Draft', description: 'This job posting will no longer be publicly accessible.', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [selected, setSelected] = useState(publishingOptions[0])

  return (
    <>
      <div className="min-h-full">
        {/* Navbar */}
       

        {/* Page heading */}
        <header className="bg-gray-50 text-left py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
            <div className="flex-1 min-w-0">
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-4">
                  
                  <li>
                    <div className="flex items-center">
                      <ChevronLeftIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                      <Link to="/dashboard" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                        Back to Discussions
                     </Link>
                    </div>
                  </li>
                </ol>
              </nav>
              <h1 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                User Questions on Lube and Castrol Oil
              </h1>
              {/* <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-8">
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <BriefcaseIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  Full-time
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <LocationMarkerIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  Remote
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <CurrencyDollarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  $120k &ndash; $140k
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  Closing on January 9, 2020
                </div>
              </div> */}
            </div>
            <div className="mt-5 flex xl:mt-0 xl:ml-4">
              <span className="hidden sm:block">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500"
                >
                  <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                  Edit
                </button>
              </span>

              <span className="hidden sm:block ml-3">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500"
                >
                  <LinkIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                  View
                </button>
              </span>

              <div className="sm:ml-3 relative z-0">
                <Listbox value={selected} onChange={setSelected}>
                  {({ open }) => (
                    <>
                      <Listbox.Label className="sr-only">Change published status</Listbox.Label>
                      <div className="relative">
                        <div className="inline-flex shadow-sm rounded-md divide-x divide-purple-600">
                          <div className="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-purple-600">
                            <div className="relative inline-flex items-center bg-purple-500 py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white">
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              <p className="ml-2.5 text-sm font-medium">{selected.name}</p>
                            </div>
                            <Listbox.Button className="relative inline-flex items-center bg-purple-500 p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-purple-600 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500">
                              <span className="sr-only">Change published status</span>
                              <ChevronDownIcon className="h-5 w-5 text-white" aria-hidden="true" />
                            </Listbox.Button>
                          </div>
                        </div>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="origin-top-right absolute left-0 mt-2 -mr-1 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none sm:left-auto sm:right-0">
                            {publishingOptions.map((option) => (
                              <Listbox.Option
                                key={option.name}
                                className={({ active }) =>
                                  classNames(
                                    active ? 'text-white bg-purple-500' : 'text-gray-900',
                                    'cursor-default select-none relative p-4 text-sm'
                                  )
                                }
                                value={option}
                              >
                                {({ selected, active }) => (
                                  <div className="flex flex-col">
                                    <div className="flex justify-between">
                                      <p className={selected ? 'font-semibold' : 'font-normal'}>{option.name}</p>
                                      {selected ? (
                                        <span className={active ? 'text-white' : 'text-purple-500'}>
                                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                      ) : null}
                                    </div>
                                    <p className={classNames(active ? 'text-purple-200' : 'text-gray-500', 'mt-2')}>
                                      {option.description}
                                    </p>
                                  </div>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
              </div>

              {/* Dropdown */}
              <Menu as="div" className="ml-3 relative sm:hidden">
                <Menu.Button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                  More
                  <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 -mr-1 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="#"
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Edit
                       </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="#"
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          View
                       </Link>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </header>

        <main className="pt-8 pb-16">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 sm:px-0">
              <h2 className="text-lg text-left font-medium text-gray-900">Start of Discussion</h2>

              {/* Tabs  */}
              <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                  Select a tab
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                  id="tabs"
                  name="tabs"
                  className="mt-4 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                  defaultValue={tabs.find((tab) => tab.current).name}
                >
                  {tabs.map((tab) => (
                    <option key={tab.name}>{tab.name}</option>
                  ))}
                </select>
              </div>
   
              
              <div className="hidden sm:block">
               
              </div>
            </div>

            {/* Stacked list */}
            <ul className="mt-5 border-t border-gray-200 divide-y divide-gray-200 sm:mt-0 sm:border-t-0">
              {candidates.map((candidate) => (
                <li key={candidate.Email}>
                  <Link to="#" className="group block">
                    <div className="flex items-center py-5 px-4 sm:py-6 sm:px-0">
                      <div className="min-w-0 flex-1 flex items-center">
                        <div className="flex-shrink-0">
                          <img
                            className="h-12 w-12 rounded-full group-hover:opacity-75"
                            src={candidate.imageUrl}
                            alt=""
                          />
                        </div>
                        <div className="min-w-0 flex-1 px-4 text-left md:grid md:grid-cols-1 md:gap-4">
                          <div>
                            <p className='text-left '>
                            <span className="text-sm font-medium text-purple-600 truncate">{candidate.name}</span>
                            <span className="text-sm font-lite text-gray-500 truncate">   -  <time dateTime={candidate.appliedDatetime}>{candidate.applied}</time>
                              </span>
                                </p>
                                <p className="mt-2 flex items-center text-sm text-gray-500">
                               <span className="text-sm font-lite text-gray-500">{candidate.Question}</span>
                              
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500">
                              <MailIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                              <span className="truncate">{candidate.email}</span>
                              
                            </p>
                         {/*  <div className="hidden md:block">
                            <div>
                              <p className="mt-2 flex items-center text-sm text-gray-500">
                                <CheckCircleIcon
                                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                                  aria-hidden="true"
                                />
                                {candidate.status}
                              </p>
                            </div>
                          </div> */}
                          </div>
                          
                        </div>
                      </div>
                      <div>
                        <ChevronLeftIcon
                          className="h-5 w-5 text-gray-400 group-hover:text-gray-700"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                 </Link>
                </li>
              ))}
            </ul>

            {/* Pagination */}
            <nav
              className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0"
              aria-label="Pagination"
            >
              <div className="-mt-px w-0 flex-1 flex">
                <Link to="#"
                  className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-200"
                >
                  <ArrowNarrowLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                  Previous
               </Link>
              </div>
              <div className="hidden md:-mt-px md:flex">
                <Link to="#"
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                >
                  1
               </Link>
                {/* Current: "border-purple-500 text-purple-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200" */}
                <Link to="#"
                  className="border-purple-500 text-purple-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                  aria-current="page"
                >
                  2
               </Link>
                <Link to="#"
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                >
                  3
               </Link>
                <Link to="#"
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                >
                  4
               </Link>
                <Link to="#"
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                >
                  5
               </Link>
                <Link to="#"
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                >
                  6
               </Link>
              </div>
              <div className="-mt-px w-0 flex-1 flex justify-end">
                <Link to="#"
                  className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-200"
                >
                  Next
                  <ArrowNarrowRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
               </Link>
              </div>
            </nav>
          </div>
        </main>
      </div>
    </>
  )
}