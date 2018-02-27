require 'pathname'

module Jekyll
  module UrlRelativizer
    # def relativize_url(url)
    #   pageUrl = @context.registers[:page]["url"]
    #   if pageUrl[-1] == "/"
    #     pageDir = Pathname(pageUrl)
    #   else
    #     pageDir = Pathname(pageUrl).parent
    #   end
    # ret = Pathname(url).relative_path_from(pageDir).to_s
    # puts pageDir.to_s + + " -> " + url.to_s + " => " + ret
    # ret
    # end

    def relativize_url(input)
      return if input.nil?
      input = ensure_leading_slash(input)
      page_url = @context.registers[:page]["url"]
      if page_url[-1]
        page_dir = Pathname(page_url)
      else
        page_dir = Pathname(page_url).parent
      end

      ret = Pathname(input).relative_path_from(page_dir).to_s
      # puts page_url.to_s + "," + page_dir.to_s + + "," + input.to_s + "," + ret
      return ret
    end
  end
end

Liquid::Template.register_filter(Jekyll::UrlRelativizer)
