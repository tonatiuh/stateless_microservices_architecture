require 'redis'
require 'json'

# NOTE: related resource https://thoughtbot.com/blog/redis-pub-sub-how-does-it-work

class RedisEngine
  attr_reader :sub, :pub

  def initialize
    @sub = Redis.new
    @pub = Redis.new
  end

  def subscribe
    sub.subscribe('events') do |on|
      on.message do |channel, message|
        return unless channel == 'events'
        data = decode(message)

        if (data['payload']['current'] === 'r')
          pub.publish('actions', encode(
            metadata: data['metadata'],
            payload: {
              '0': 'This comes from the ♦ R️uby micro.',
            }
          ))

          puts data.inspect
        end
      end
    end
  end

  private

  def encode(data)
    data.to_json
  end

  def decode(encoded)
    JSON.parse(encoded)
  end
end
