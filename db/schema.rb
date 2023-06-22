# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_06_22_001452) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bot_settings", force: :cascade do |t|
    t.text "welcome_message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "domains", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "organization_id"
    t.boolean "indexed"
    t.index ["organization_id"], name: "index_domains_on_organization_id"
  end

  create_table "external_resource_metadata", force: :cascade do |t|
    t.string "key"
    t.text "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "organization_id"
    t.boolean "indexed", default: false
    t.string "box_file_id"
    t.boolean "processing"
    t.text "error"
    t.string "process_uuid"
    t.string "web_page_id"
    t.index ["organization_id"], name: "index_external_resource_metadata_on_organization_id"
  end

  create_table "flow_requests", force: :cascade do |t|
    t.string "json"
    t.string "flow_name"
    t.string "error_message"
    t.boolean "executed"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "gpt_api_keys", force: :cascade do |t|
    t.bigint "organization_id", null: false
    t.string "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_gpt_api_keys_on_organization_id"
  end

  create_table "interactions", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "medium"
    t.bigint "prompt_id"
    t.bigint "response_id"
    t.index ["prompt_id"], name: "index_interactions_on_prompt_id"
    t.index ["response_id"], name: "index_interactions_on_response_id"
  end

  create_table "messages", force: :cascade do |t|
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.boolean "has_audio"
    t.bigint "writer_id"
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "notion_pages", force: :cascade do |t|
    t.string "name"
    t.text "content"
    t.string "notion_id"
    t.bigint "notion_page_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "organization_id"
    t.index ["notion_page_id"], name: "index_notion_pages_on_notion_page_id"
    t.index ["organization_id"], name: "index_notion_pages_on_organization_id"
  end

  create_table "organization_files", force: :cascade do |t|
    t.string "box_id"
    t.bigint "organization_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "indexed_at", precision: nil
    t.string "name"
    t.index ["organization_id"], name: "index_organization_files_on_organization_id"
  end

  create_table "organizations", force: :cascade do |t|
    t.string "notifications_id"
    t.string "name"
    t.string "notifications_key"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "notion_api_key"
    t.string "slack_team_id"
    t.boolean "approved", default: false
    t.boolean "is_indexed", default: false, null: false
    t.boolean "nlp_indexed", default: false, null: false
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "search_archives", force: :cascade do |t|
    t.bigint "organization_id", null: false
    t.text "query", null: false
    t.text "response", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_search_archives_on_organization_id"
  end

  create_table "slack_user_settings", force: :cascade do |t|
    t.string "slack_user_id"
    t.datetime "messages_tab_opened_at", precision: nil
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_organizations", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "organization_id", null: false
    t.boolean "selected", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "is_admin", default: false
    t.index ["organization_id"], name: "index_user_organizations_on_organization_id"
    t.index ["user_id"], name: "index_user_organizations_on_user_id"
  end

  create_table "user_roles", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "organization_id"
    t.bigint "user_id"
    t.bigint "role_id"
    t.index ["organization_id", "user_id", "role_id"], name: "idx_user_role_on_organization", unique: true
    t.index ["organization_id"], name: "index_user_roles_on_organization_id"
    t.index ["role_id"], name: "index_user_roles_on_role_id"
    t.index ["user_id"], name: "index_user_roles_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "jti", default: "", null: false
    t.string "provider"
    t.string "uid"
    t.string "avatar_url"
    t.string "given_name"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["jti"], name: "index_users_on_jti", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "web_pages", force: :cascade do |t|
    t.boolean "indexed"
    t.text "content"
    t.string "url"
    t.bigint "organization_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "domain_id"
    t.index ["domain_id"], name: "index_web_pages_on_domain_id"
  end

  add_foreign_key "domains", "organizations"
  add_foreign_key "external_resource_metadata", "organizations"
  add_foreign_key "gpt_api_keys", "organizations"
  add_foreign_key "interactions", "messages", column: "prompt_id"
  add_foreign_key "interactions", "messages", column: "response_id"
  add_foreign_key "messages", "users"
  add_foreign_key "notion_pages", "notion_pages"
  add_foreign_key "notion_pages", "organizations"
  add_foreign_key "search_archives", "organizations"
  add_foreign_key "user_organizations", "organizations"
  add_foreign_key "user_organizations", "users"
  add_foreign_key "user_roles", "organizations"
  add_foreign_key "user_roles", "roles"
  add_foreign_key "user_roles", "users"
  add_foreign_key "web_pages", "domains"
end
