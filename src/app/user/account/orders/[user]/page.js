import React, { Suspense } from 'react'
import { use_get } from '../../../../../lib/functions'
import OrderPage from '../OrderPage'

const loadOrders = async (user) => {
  return await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders?where[user][equals]=${user}` }).then((res) => {
    return res
  })
}
const OrdersPage = async ({ params }) => {

  const { user } = await params
  const orders = await loadOrders(user)
  const docs = orders.docs

  const crumbs = [
    {
      title: "Home",
      link: "/",
      description: "Auctionier home page"
    },
    {
      title: "Orders",
      link: `/user/account/orders/${user}`,
      description: "Auctionier home page"
    }
  ]

  return (
    <Suspense>
      <OrderPage docs={docs}  crumbs={crumbs}/>
    </Suspense>
  )
}

export default OrdersPage