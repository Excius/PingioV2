import { Camera, Mail, User } from "lucide-react";
import {
  useAuthCheckQuery,
  useUpdateProfileMutation,
} from "../redux/services/authApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function ProfilePage() {
  const { data: authUser, error: authError, refetch } = useAuthCheckQuery({});
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  useEffect(() => {
    if (authError) {
      toast.error(
        authError?.data?.message ||
          "An error occurred while fetching profile data"
      );
    }
  }, [authError]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file) return;

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result as string;
      setSelectedImg(base64Image);

      try {
        await updateProfile({ profilePic: base64Image });
        toast.success("Profile picture updated successfully!");
        refetch();
      } catch (err) {
        toast.error("Failed to update profile picture");
        console.error("Profile update error:", err);
        setSelectedImg(null);
      }
    };

    reader.onerror = () => {
      toast.error("Failed to read the file");
    };
  };
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-base-100 to-base-200">
      <div className="max-w-4xl mx-auto p-4 py-8">
        <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-6 py-8 text-center border-b border-base-300">
            <h1 className="text-3xl font-bold text-base-content">
              Profile Settings
            </h1>
            <p className="mt-2 text-base-content/70">
              Manage your account information and preferences
            </p>
          </div>

          {/* Avatar Section */}
          <div className="px-6 py-8">
            <div className="flex flex-col items-center gap-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <img
                  src={
                    selectedImg ||
                    authUser?.profilePic ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      authUser?.fullName || "User"
                    )}&background=6366f1&color=fff&size=200`
                  }
                  alt="Profile"
                  className="size-40 rounded-full object-cover border-4 border-white shadow-lg relative z-10"
                />
                <label
                  htmlFor="avatar-upload"
                  className={`
                    absolute bottom-2 right-2 z-20
                    bg-primary hover:bg-primary-focus
                    p-3 rounded-full cursor-pointer 
                    shadow-lg hover:shadow-xl
                    transition-all duration-200 hover:scale-110
                    ${
                      isUpdating
                        ? "animate-pulse pointer-events-none opacity-50"
                        : ""
                    }
                  `}
                >
                  <Camera className="w-5 h-5 text-white" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdating}
                  />
                </label>
              </div>
              <div className="text-center">
                <h2 className="text-xl font-semibold text-base-content">
                  {authUser?.fullName}
                </h2>
                <p className="text-sm text-base-content/60 mt-1">
                  {isUpdating
                    ? "Uploading image..."
                    : "Click the camera icon to update your photo"}
                </p>
              </div>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="px-6 pb-6">
            <div className="border-t border-base-300 pt-6">
              <h3 className="text-lg font-semibold text-base-content mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Personal Information
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-base-content/70 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  <div className="p-4 bg-base-200 rounded-lg border border-base-300 hover:border-primary/50 transition-colors">
                    <p className="text-base-content font-medium">
                      {authUser?.fullName}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-base-content/70 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <div className="p-4 bg-base-200 rounded-lg border border-base-300 hover:border-primary/50 transition-colors">
                    <p className="text-base-content font-medium">
                      {authUser?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Information Section */}
          <div className="px-6 pb-8">
            <div className="border-t border-base-300 pt-6">
              <h3 className="text-lg font-semibold text-base-content mb-6 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Account Information
              </h3>

              <div className="bg-base-200 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-base-300/50">
                  <span className="text-base-content/70 font-medium">
                    Member Since
                  </span>
                  <span className="text-base-content font-semibold">
                    {new Date(authUser?.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-base-content/70 font-medium">
                    Account Status
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-600 font-semibold">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
