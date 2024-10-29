import { TReview } from './review.interface'
import Review from './review.model'

const getReviewsFromDB = async (number: number) => {
  // Fetch the reviews based on the number
  let result
  if (number > 0) {
    result = await Review.find().sort({ createdAt: -1 }).limit(number)
  } else {
    result = await Review.find().sort({ createdAt: -1 })
  }

  // Fetch all reviews for average rating calculation
  const allReviews = await Review.find()

  // Calculate average rating
  const totalRatings = allReviews.reduce(
    (sum, review) => sum + review.rating,
    0,
  )
  const averageRating =
    allReviews.length > 0
      ? (totalRatings / allReviews.length).toFixed(2)
      : '0.00'
  const totalRating = allReviews?.length

  return {
    result,
    averageRating,
    totalRating,
  }
}

const createReviewIntoDB = async (reviewData: TReview) => {
  const result = await Review.create(reviewData)
  return result
}

export const reviewServices = {
  getReviewsFromDB,
  createReviewIntoDB,
}