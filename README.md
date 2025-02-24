# GFit 🏋️‍♂️

**GFit** is a fitness tracking and workout planning app that helps users stay active, track progress, and achieve their health goals.

## 🚀 Features

- 🏋️ Personalized workout plans
- 📊 Progress tracking
- 🍎 Nutrition insights
- 🎯 Goal setting
- 📅 Daily reminders

## Features

- **Authentication:**

  - Secure signup and login implemented via NextAuth.
  - Passwords are hashed with bcrypt.

- **Workout Tracking:**

  - Monitor daily calorie goals, calories burned, progress, and recent workouts.
  - **Exercise Calculator Formula:**
    - **Calories Burned:**  
      Calories burned = MET × Weight (kg) × (Duration in hours) × Intensity Multiplier
  - **Balanced Workout Routine Calculation:**
    - Cardio Calories = Target Calories × 50%
    - Strength Calories = Target Calories × 30%
    - Flexibility Calories = Target Calories × 20%
    - Durations/reps per exercise are calculated based on the allocated calories and the exercise's calories-per-minute or reps-per-minute rate.

- **Food Calorie Tracker:**
  - Log foods consumed and calculate their calorie contribution.

## Future Enhancements

- Implementation of email verification upon signup.
- Phone number verification using OTP.
- Expanded workout metrics and personalized insights.

## 👨‍💻 Developers

- **Narayan Bhusal**  
  _Lead Developer _||_ Frontend Developer_

- **Nayan Acharya**  
  _Lead Developer_ || _Backend Developer_

- **Dilip Acharya**  
  _Backend Developer_

- **Shsank Shrestha**  
  _Backend Developer _||_ Fitness Head_

- **Rabin Chudali**  
  _Frontend Developer_

## 📸 Screenshots

<p align="center">
  <img src="https://iili.io/2yDC0QI.png" alt="GFit Home Screen" style="border-radius: 10px; margin: 10px; width: 45%; display: inline-block;">
  <img src="https://iili.io/2yDCEBt.png" alt="LogIn/SignUp" style="border-radius: 10px; margin: 10px; width: 45%; display: inline-block;">
  <br>
  <img src="https://iili.io/2yDT2EB.png" alt="Feature 1" style="border-radius: 10px; margin: 10px; width: 30%; display: inline-block;">
  <img src="https://iili.io/2yDCW2s.png" alt="Feature 2" style="border-radius: 10px; margin: 10px; width: 30%; display: inline-block;">
  <img src="https://iili.io/2yDT3rP.png" alt="Feature 3" style="border-radius: 10px; margin: 10px; width: 30%; display: inline-block;">
</p>

## 🛠️ Installation

```sh
# Clone the repository
git clone https://github.com/Owls-of-Nights/GFit.git

# Navigate to the project directory
cd GFit

# Install dependencies
npm install

# Start the application
npm start
```

## 🤝 Contributing

Feel free to contribute! Fork the repository, create a feature branch, and submit a pull request.

## 📜 License

This project is owned by [Night Owls](https://night-owls.vercel.app).
So use of it for economic benefit is prohibited.

---

Made with ❤️ by [Night Owls](https://night-owls.vercel.app)
