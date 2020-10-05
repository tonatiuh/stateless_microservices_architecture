require 'sinatra/base'
require 'sinatra/reloader'
require './engines/redis_engine'

class MyApp < Sinatra::Base
  configure :development do
    register Sinatra::Reloader
    RedisEngine.new.subscribe
  end

  # TODO: need to figure out how to keep Sinatra responsive while Redis is
  # listening for messages. The issue seems to be related to the synchronicity of Ruby.
  # Seems related to https://stackoverflow.com/a/30497718/1164011.
  # Might be fixed with https://github.com/redis/redis-rb#synchrony (first attempts
  # didn't work).
  get '/alive' do
    'OK'
  end
end

