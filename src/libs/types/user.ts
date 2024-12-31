export type UserInfor = {
  phoneNumber: number;
  id: number;
  name: string;
  email: string;
  address: string;
  role: string;
  avatar: string;
};

export type EditInfoFormInput = {
  name: string;
  email: string;
  phone_number: string;
  address: string;
};

export type ChangePasswordFormInput = {
  current_password: string;
  password: string;
  password_confirmation: string;
};

export type ChangeEmailFormInput = {
  email: string;
  password: string;
};

export type InformationForm = {
  phoneNumber: string;
  name: string;
  email: string;
  address: string;
  avatar: string | null;
};

export type ChangeAvatarResponse = {
  status: true;
  data: {
    avatar: string;
  };
};

export type AvatarUploadProps = {
  currentAvatar?: string;
  onSave: (newAvatarUrl: string) => void;
};
