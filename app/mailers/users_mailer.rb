# frozen_string_literal: true

# rubocop:disable Rails/I18nLocaleTexts

class UsersMailer < ApplicationMailer
  def reset_password_instructions(user, token)
    @user = user
    @token = token
    @url = "#{ENV.fetch('REACT_APP_API_URL', nil)}reset-password?token=#{token}&email=#{user.email}"

    mail(to: user.email, subject: 'Reset Password Instructions')
  end
end

# rubocop:enable Rails/I18nLocaleTexts
