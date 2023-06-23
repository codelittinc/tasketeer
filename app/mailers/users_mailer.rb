# frozen_string_literal: true

# rubocop:disable Rails/I18nLocaleTexts

class UsersMailer < ApplicationMailer
  def reset_password_instructions(user, token)
    @user = user
    @token = token
    @url = "#{ENV.fetch('REACT_APP_API_URL', nil)}reset-password?token=#{token}&email=#{user.email}"

    mail(to: user.email, subject: 'Reset Password Instructions').tap do |message|
      message.mailgun_options = {
        'tag' => %w[abtest-option-a beta-user],
        'tracking-opens' => true,
        'tracking-clicks' => 'htmlonly'
      }
    end
  end
end

# rubocop:enable Rails/I18nLocaleTexts
