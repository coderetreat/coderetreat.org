module Jekyll
    module HashFilter
      def values(input)
        case
          when input.instance_of?(Hash)
            input.values
          else
            input
        end
      end
      def kv_entries(input)
        case
          when input.instance_of?(Hash)
            input.map { |k,v| [["k", k], ["v", v]].to_h }
          else
            input
        end
      end
        
    end
  end
  

  Liquid::Template.register_filter(Jekyll::HashFilter) 

