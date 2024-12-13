import { useUser } from "@/context/UserContext";
import axios from "axios";
import { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [isPending, startTransition] = useTransition();
  const token = localStorage.getItem("token");

  const getProfile = () => {
    startTransition(async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (res.status === 200) {
          setProfile(res.data);
        }
      } catch (error) {
        if (error.response.status === 404) {
          return;
        }
        console.log(error);
      }
    });
  };
  useEffect(() => {
    getProfile();
  }, []);
  const createProfile = (newProfile) => {
    startTransition(async () => {
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/createprofile`,

          newProfile,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.status === 201) {
            toast.success(res.data.message);
            getProfile();
            return;
          }
        })
        .catch((err) => {
          if (err.response.status === 400) {
            toast.error(err.response.data.message);
            return;
          }
          if (err.response.status === 404) {
            toast.error(err.response.data.message);
            return;
          }
          console.log(err);
        });
    });
  };

  const updateProfile = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  const deleteProfile = () => {
    startTransition(async () => {
      axios
        .delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/deleteprofile/${
            profile.id
          }`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setProfile(null);
            getProfile();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
    setProfile(null);
  };

  return {
    isPending,
    profile,
    createProfile,
    updateProfile,
    deleteProfile,
  };
}
