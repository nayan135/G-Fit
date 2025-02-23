import { useTheme } from "next-themes"
import Image from "next/image"
import { Upload, Mail, Phone, Scale, Calendar } from "lucide-react"

export default function ProfileCard({ userData, isEditing, handleInputChange, handleFileUpload }) {
  return (
    <div className="backdrop-blur-md bg-white/10 rounded-2xl shadow-xl overflow-hidden">
      {/* ...existing header background... */}
      <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-500">
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
          <div className="relative w-32 h-32">
            <Image
              src={userData.profilePic || "/placeholder.svg"}
              alt="Profile"
              fill
              className="rounded-full border-4 border-white dark:border-gray-800 object-cover"
            />
            {isEditing && (
              <label
                htmlFor="profile-upload"
                className="absolute bottom-0 right-0 gradient-primary p-2 rounded-full cursor-pointer shadow-lg"
              >
                <Upload className="w-4 h-4" />
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            )}
          </div>
        </div>
      </div>

      <div className="px-6 pt-20 pb-6 space-y-4">
        <div className="text-center">
          {isEditing ? (
            <input
              type="text"
              name="fullName"
              value={userData.fullName}
              onChange={handleInputChange}
              className="text-center text-xl font-bold bg-transparent border-b-2 border-white/20 focus:border-white/50 outline-none px-2 py-1"
            />
          ) : (
            <h2 className="text-xl font-bold">{userData.fullName}</h2>
          )}
          <p className="text-white/60 text-sm">{userData.fitnessLevel} Level</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
            <Mail className="w-5 h-5 text-blue-300" />
            <span className="text-sm">{userData.email}</span>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
            <Phone className="w-5 h-5 text-green-300" />
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                className="w-full bg-transparent border-b border-white/20 focus:border-white/50 outline-none"
              />
            ) : (
              <span className="text-sm">{userData.phone}</span>
            )}
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
            <Scale className="w-5 h-5 text-yellow-300" />
            {isEditing ? (
              <input
                type="number"
                name="weight"  // changed from "Weight" to "weight"
                value={userData.weight}  // changed from userData.Weight
                onChange={handleInputChange}
                className="w-full bg-transparent border-b border-white/20 focus:border-white/50 outline-none"
              />
            ) : (
              <span className="text-sm">{userData.weight} kg</span>  // changed from userData.Weight
            )}
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
            <Calendar className="w-5 h-5 text-purple-300" />
            {isEditing ? (
              <input
                type="text"
                name="age"
                value={userData.age}
                onChange={handleInputChange}
                className="w-full bg-transparent border-b border-white/20 focus:border-white/50 outline-none"
              />
            ) : (
              <span className="text-sm">{userData.age} years</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
