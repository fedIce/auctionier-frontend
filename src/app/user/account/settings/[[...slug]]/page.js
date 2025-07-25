'use client'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React, { Suspense, use, useEffect, useState } from 'react'
import { LoaderSpinnerAnimation } from '../../../../../components/util/checker'
import { useAuth } from '../../../../../contexts/auth'
import { useAlert } from '../../../../../contexts/Alert'
import Link from 'next/link'
import AShippinForm from '../../../../../contexts/auth/shippingForm'
import CheckBox from '../../../../../components/CheckBox'
import Invoices from '../invoices'

const UserAccount = ({ params }) => {
  const { slug } = use(params)


  return (
    <Suspense>
      <UserAccountComponent slug={slug} />
    </Suspense>
  )
}

const UserAccountComponent = ({ slug }) => {

  const auth = useAuth()
  const user = auth.user?.user
  const page = Array.isArray(slug) ? slug[0] : ['account-security']

  console.log(slug)

  const settings = [
    {
      title: 'Account & security',
      description: 'Manage you account security details like passwords, and 2FA',
      tag: 'account-security'
    },
    {
      title: 'Account Preferences',
      description: 'Manage you account security details like passwords, and 2FA',
      tag: 'account-preferences'
    },
    {
      title: 'Contact Information',
      description: 'Manage your contact information',
      tag: 'contact-information'
    },
    {
      title: 'Invoices',
      description: 'Manage you account security details like passwords, and 2FA',
      tag: 'invoices'
    }
  ]


  return (
    <Suspense>
      <div className='w-full divide-y divide-secondary/10 space-y-4 mb-20'>
        <div>
          <div className='text-4xl font-black py-4 text-end'>Hello, {user?.fullname.split(" ")[0]}</div>
        </div>
        <div className='flex items-start'>
          <div className='max-w-[30%] p-2 w-full pb-16 flex space-y-8 divide-y flex-col'>
            {
              settings.map((setting, i) => {
                const active = page?.includes(setting.tag)

                return (
                  <Link href={`/user/account/settings/${setting.tag}`} className={`py-2 w-full transition-all duration-300 border-b-4  cursor-pointer px-2 ${active ? 'bg-secondary-900 border-secondary-700 ' : 'bg-transparent hover:bg-secondary-900 border-transparent hover:border-secondary-700'}`} key={i}>{setting.title}</Link>
                )
              })
            }
          </div>
          {
            page == settings[0].tag ?? false ?
              <AccountSecurity auth={auth} user={user} /> :

              page == settings[1].tag ?
                <AccountPreferences />
                :
                page == settings[2].tag ?
                  <AShippinForm hide={() => null} auth={auth} />
                  :
                  page == settings[3].tag ?
                    <Invoices />
                    :
                    <AccountSecurity auth={auth} user={user} />

          }
        </div>
      </div>
    </Suspense>
  )
}


export default UserAccount

const AccountSecurity = ({ auth, user }) => {

  const action = async (key, value) => {
    const data = {}
    data[key] = value
    console.log(user?.id, '&&&')
    return await auth.updateUser({ id: user?.id, data, token: auth.user?.token })
  }

  return (
    <div className='flex flex-1 p-2 space-y-4 flex-col w-full'>
      <ProfileInput label='Email' placeholder='youremail@mail.com' value={user?.email} k='email' action={action} disabled />
      <ProfileInput label='Username' placeholder='user-name' value={user?.username} k="username" action={action} />
      <ProfileInput label='FullName' placeholder='John Smith' value={user?.fullname} k="fullname" action={action} />
      <ProfileInput label='Phone Number' placeholder='+123 456 789 00' value={user?.phone} k="phone" action={action} />
      <ProfileInput type='password' label='Password' placeholder='***********' value={'***********'} k="password" action={action} />
    </div>
  )
}

const AccountPreferences = () => {
  const NotificationPreferences = [
    {
      title: 'Auction ending soon',
      name: 'auction_ending_soon_notification',
      active: true
    },
    {
      title: 'Outbided',
      name: 'auction_outbided_notification',
      active: true
    },
    {
      title: 'New auction in tracked search',
      name: 'auction_new_in_tracked_search_notification',
      active: true
    }
  ]


  const EmailPreferences = [
    {
      title: 'Auction ending soon',
      name: 'auction_ending_soon_email',
      active: true
    },
    {
      title: 'Outbided',
      name: 'auction_outbided_email',
      active: true
    },
    {
      title: 'New auction in tracked search',
      name: 'auction_new_in_tracked_search_email',
      active: true
    }
  ]

  const UserPreferences = [
    {
      title: 'Display username to everyone',
      name: 'display_user_name_setting',
      active: true
    }
  ]


  return (
    <div className='w-full space-y-16'>
      <div className='w-full space-y-8'>
        <div className='text-2xl font-medium'>Notification Preferences</div>
        <div className='w-full space-y-4 pl-10'>
          {
            NotificationPreferences.map((pref, i) => {
              return <ProfileCheckBox title={pref.title} legend={pref.name} key={i} />
            })
          }
        </div>
      </div>

      <div className='w-full space-y-8'>
        <div className='text-2xl font-medium'>Email Preferences</div>
        <div className='w-full space-y-4 pl-10'>
          {
            EmailPreferences.map((pref, i) => {
              return <ProfileCheckBox title={pref.title} legend={pref.name} key={i} />
            })
          }
        </div>
      </div>

      <div className='w-full space-y-8'>
        <div className='text-2xl font-medium'>User Preferences</div>
        <div className='w-full space-y-4 pl-10'>
          {
            UserPreferences.map((pref, i) => {
              return <ProfileCheckBox title={pref.title} legend={pref.name} key={i} />
            })
          }
        </div>
      </div>
    </div>
  )
}



const ProfileCheckBox = ({ title, legend }) => {

  const [checked, setChecked] = useState(false)

  const alert = useAlert()
  const auth = useAuth()
  const user = auth.user?.user

  useEffect(() => {
    console.log(user)
    setChecked(user?.preferences[legend])
  }, [user])


  const onCheck = async (legend, w=null) => {
    const data = {}
    data[legend] = !checked
    await auth.updateUser({ id: user.id, data: { preferences: data }, token: auth.user?.token })
      .then((res) => {
        console.log(res)
        setChecked(!checked)
        alert.setalert('success', res?.message ?? 'Updated Successfuly!')
      }).catch((e) => {
        console.warn(e, w)
      })
  }

  return (
    <div>
      <CheckBox checked={checked} onSelect={onCheck} title={title} legend={legend} />
    </div>
  )
}


const ProfileInput = ({ value, disabled = false, type = "text", label = "Label", placeholder = "name@mail.com", k = '', action = () => null }) => {

  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState('')
  const alert = useAlert()


  useEffect(() => {
    if (value) {
      setText(value)
    }
  }, [value])

  const handleSave = () => {
    setLoading(true)
    action(k, text).then((res) => {
      alert.setalert('success', res?.message ?? 'Updated Successfuly!')
    }).catch((e) => {
      console.warn(e)
    }).finally(() => {
      setLoading(false)
      setEditMode(false)
    })
  }

  return (
    <div className='w-full h-17 bg-secondary-900 p-2 px-4'>
      <div aria-label={label} className='font-bold'>{label}</div>
      <div className='flex items-start w-full'>
        <div className='w-full text-sm max-w-[90%]'>
          {
            editMode ?
              <input
                value={text}
                autoFocus
                type={type}
                onChange={e => setText(e.target.value)}
                className=' outline-none w-full'
                placeholder={placeholder} /> :
              <p>{text}</p>
          }
        </div>
        {disabled ? null
          :
          !editMode ?
            <div onClick={() => setEditMode(true)} className='w-full text-end px-2 text-sm underline cursor-pointer'>Edit</div> :
            <div className='flex flex-1 justify-around w-full'>
              <div onClick={() => handleSave()} className='w-7 h-7 flex items-center justify-center bg-secondary-700 cursor-pointer'>{loading ? <LoaderSpinnerAnimation width={30} height={30} /> : <CheckIcon className='w-4 h-4 stroke-2' />}</div>
              <div onClick={() => setEditMode(false)} className='w-7 h-7 flex items-center justify-center bg-red-300 cursor-pointer'><XMarkIcon className='w-4 h-4 stroke-2' /></div>
            </div>}
      </div>
    </div>
  )
}