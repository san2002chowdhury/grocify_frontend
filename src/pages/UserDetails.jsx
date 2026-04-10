import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../component/InputField";
import userProfileValidateSchema from "../validators/userProfileValidateSchema";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserData,
  updateUserProfile,
} from "../redux/features/user/userThunks";
import toast from "react-hot-toast";
import { API_URL_BASE } from "../constants/api";

const UserDetails = () => {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(userProfileValidateSchema),
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      reset({
        userName: user?.userName || "",
        email: user?.email || "",
        phone: user?.phone || "",
        houseNo: user?.address?.[0]?.houseNo || "",
        street: user?.address?.[0]?.street || "",
        landmark: user?.address?.[0]?.landmark || "",
        city: user?.address?.[0]?.city || "",
        state: user?.address?.[0]?.state || "",
        country: user?.address?.[0]?.country || "",
        pincode: user?.address?.[0]?.pincode || "",
      });

      if (user?.profilePic) {
        setPreview(user.profilePic);
      }
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    dispatch(updateUserProfile(formData));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files allowed");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be less than 2MB");
      return;
    }

    setPreview(URL.createObjectURL(file));

    setValue("profilePic", file);
  };

  return (
    <div className="min-h-screen py-4 px-4 mt-2">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl p-6 md:p-10">
        <h2 className="text-2xl font-semibold mb-8">User Profile</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="relative">
              <img
                src={
                  `${API_URL_BASE}${preview}` ||
                  "https://placehold.net/avatar.png"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-primary"
              />

              <label className="absolute bottom-0 right-0 bg-primary text-white text-xs px-3 py-1 rounded-full cursor-pointer">
                Change
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <InputField
                label="Full Name"
                name="userName"
                register={register}
                error={errors.userName}
              />

              <InputField
                label="Email"
                name="email"
                register={register}
                disabled={true}
                error={errors.email}
              />

              <InputField
                label="Phone"
                name="phone"
                register={register}
                error={errors.phone}
              />
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="House No"
              name="houseNo"
              register={register}
              error={errors.houseNo}
            />

            <InputField
              label="Street"
              name="street"
              register={register}
              error={errors.street}
            />

            <InputField
              label="Landmark"
              name="landmark"
              register={register}
              error={errors.landmark}
            />

            <InputField
              label="City"
              name="city"
              register={register}
              error={errors.city}
            />

            <InputField
              label="State"
              name="state"
              register={register}
              error={errors.state}
            />

            <InputField
              label="Country"
              name="country"
              register={register}
              error={errors.country}
            />

            <InputField
              label="Pincode"
              name="pincode"
              register={register}
              error={errors.pincode}
            />
          </div>

          <div className="flex justify-end mt-10">
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="bg-primary hover:bg-dull text-white px-8 py-3 rounded-xl transition disabled:opacity-50"
            >
              {isSubmitting || loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetails;
