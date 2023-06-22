# frozen_string_literal: true

class CreateBotSettings < ActiveRecord::Migration[7.0]
  DEFAULT_MESSAGE = "Welcome to Tasketeer! :wave:
I'm here to help you find information quickly and efficiently.
Just ask me a question, and I'll search for relevant information.

For example, you can ask me:
`What are our company's values?`
or
`How can I set up my email signature?`


If you need any help, just type the command 'help', and I'll be happy to assist you. Example:
`/tasketeer help`"

  def change
    create_table :bot_settings do |t|
      t.text :welcome_message

      t.timestamps
    end

    BotSetting.create!(welcome_message: DEFAULT_MESSAGE)
  end
end
