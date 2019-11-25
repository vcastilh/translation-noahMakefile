require 'pathname'

def ensure_leading_slash(path)
  path[0..0] == "/" ? path : "/#{path}"
end

module Jekyll
  module UrlRelativizer
    def relativize_url(input)
      return if input.nil?
      input = ensure_leading_slash(input)
      page_url = @context.registers[:page]["url"]
      if page_url[-1] == '/'
        page_dir = Pathname(page_url)
      else
        page_dir = Pathname(page_url).parent
      end

      ret = Pathname(input).relative_path_from(page_dir).to_s
      return ret
    end
  end
end

Liquid::Template.register_filter(Jekyll::UrlRelativizer)
