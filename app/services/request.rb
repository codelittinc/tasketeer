# frozen_string_literal: true

require 'net/http'
require 'json'

class Request
  def self.get(url, authorization = nil)
    uri = URI.parse(clean_url(url))
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = use_ssl?(url)
    req = Net::HTTP::Get.new(uri.request_uri)
    req['Authorization'] = authorization
    JSON.parse(http.request(req).body)
  end

  def self.post(url, authorization, body)
    use_ssl = url.match?(/^https/)
    uri = URI.parse(clean_url(url))
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = use_ssl?(url)

    request = Net::HTTP::Post.new(uri.path, { 'Content-Type' => 'application/json' })
    request.body = body.to_json
    request['Authorization'] = authorization
    request['Accept'] = 'application/json'

    response = http.request(request)
  end

  def self.patch(url, authorization, body)
    uri = URI.parse(clean_url(url))
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = use_ssl?(url)

    request = Net::HTTP::Patch.new(uri.path, { 'Content-Type' => 'application/json' })
    request.body = body.to_json
    request['Authorization'] = authorization
    request['Accept'] = 'application/json'

    response = http.request(request)
  end

  def self.use_ssl?(url)
    url.match?(/^https/)
  end

  def self.clean_url(url)
    url.gsub(' ', '%20')
  end
end
