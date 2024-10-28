/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { Request, Response } from "express";
import { PaymentService } from "./payment.service";

const confirmationController = async (req: Request, res: Response) => {
  const transactionId = req.query.transactionId;
  // console.log(transactionId);
  const result = await PaymentService.confirmationService(
    transactionId as string
  );
  // console.log(result);
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Success</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #2a2a2a; /* bg-secondary */
      color: #f5f5f5; /* text-text */
      font-family: Arial, sans-serif;
    }

    .container {
      text-align: center;
      padding: 20px;
    }

    .icon {
      width: 64px;
      height: 64px;
      margin: 30px auto;
      color: #16a34a; /* green-600 */
    }

    .icon svg {
      width: 100%;
      height: 100%;
      fill: currentColor;
    }

    .title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .description {
      color: #cccccc; /* gray-200 */
      margin-bottom: 10px;
    }

    .button {
      display: inline-block;
      padding: 10px 30px;
      background-color: #4f46e5; /* indigo-600 */
      color: white;
      text-decoration: none;
      font-weight: bold;
      margin-top: 30px;
      border-radius: 5px;
    }

    .button:hover {
      background-color: #4338ca; /* indigo-500 */
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon">
      <svg viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
        ></path>
      </svg>
    </div>
    <h3 class="title">Payment Done!</h3>
    <p class="description">Thank you for completing your secure online payment.</p>
    <p>Have a great day!</p>
    <a href="http://localhost:5000/dashboard/upcoming-bookings" class="button">Go to Dashboard</a>
  </div>
</body>
</html>
`);
};

const paymentFailedController = async (req: Request, res: Response) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Failed</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #2a2a2a; /* bg-secondary */
      color: #f5f5f5; /* text-text */
      font-family: Arial, sans-serif;
    }

    .container {
      text-align: center;
      padding: 20px;
    }

    .icon {
      width: 64px;
      height: 64px;
      margin: 30px auto;
      color: #dc2626; /* red-600 */
    }

    .icon svg {
      width: 100%;
      height: 100%;
      fill: currentColor;
    }

    .title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .description {
      color: #cccccc; /* gray-200 */
      margin-bottom: 10px;
    }

    .button {
      display: inline-block;
      padding: 10px 30px;
      background-color: #ef4444; /* red-600 */
      color: white;
      text-decoration: none;
      font-weight: bold;
      margin-top: 30px;
      border-radius: 5px;
    }

    .button:hover {
      background-color: #dc2626; /* red-500 */
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon">
      <svg viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm5.657,8.343-1.414-1.414L12,10.586,7.757,6.343,6.343,7.757,10.586,12,6.343,16.243l1.414,1.414L12,13.414l4.243,4.243,1.414-1.414L13.414,12Z"
        ></path>
      </svg>
    </div>
    <h3 class="title">Payment Failed!</h3>
    <p class="description">Unfortunately, your payment could not be processed.</p>
    <p>Please try again or contact support.</p>
    <a href="http://localhost:5000" class="button">Home</a>
  </div>
</body>
</html>
`);
};

export const paymentController = {
  confirmationController,
  paymentFailedController,
};