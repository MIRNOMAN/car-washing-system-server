import config from '../../config'
import { TBooking } from '../Booking/booking.interface'
import { Booking } from '../Booking/booking.model'
import { Slot } from '../Slot/slot.model'
import { verifyPayment } from './payment.utils'

const confirmationService = async (
  transactionId: string,
  status: string,
  paidStatus: string,
) => {
  const verifyResponse = await verifyPayment(transactionId)

  if (verifyResponse && verifyResponse?.pay_status === 'Successful') {
    const bookingInfo = (await Booking.findOne({
      tran_id: transactionId,
    })) as TBooking
    const slotId = bookingInfo.slot
    const slotInfo = await Slot.findById(slotId)
    if (slotInfo) {
      slotInfo.isBooked = 'booked'
      await slotInfo.save()
    }
    await Booking.findOneAndUpdate(
      { tran_id: transactionId },
      {
        status: paidStatus,
      },
      { new: true },
    )
  }

  const successTemplate = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          .success {
            color: #4CAF50;
          }
          .cancel {
            color: #f44336;
          }
          .redirect-link {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
            color: #fff;
          }
          .success-link {
            background-color: #4CAF50;
          }
          .cancel-link {
            background-color: #f44336;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 class="${status === 'success' ? 'success' : 'cancel'}">
            Payment ${status === 'success' ? 'Successful' : 'Canceled'}
          </h1>
          <a href="${config.client_live_url_service_page}" class="redirect-link ${status === 'success' ? 'success-link' : 'cancel-link'}">
            ${status === 'success' ? 'Explore more' : 'Retry Payment'}
          </a>
        </div>
      </body>
    </html>
  `

  return successTemplate
}

export const PaymentServices = {
  confirmationService,
}