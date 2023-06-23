export const getLabels = (showConfirmation, email) => {
  if (showConfirmation) {
    return {
      header: 'Check your email',
      subLabel: `Password reset instructions were sent to ${email}`,
      button: 'Resend email',
    };
  }
  return {
    header: 'Forgot your Password?',
    subLabel: 'Enter your email address and we will send you password reset instructions.',
    button: 'Send',
  };
};

export default {
  getLabels,
};
