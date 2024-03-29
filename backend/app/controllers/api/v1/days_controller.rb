# frozen_string_literal: true

module Api
  module V1
    class DaysController < ApplicationController
      before_action :set_day, only: %i[show update destroy]

      # GET /days
      def index
        @days = Day.all

        render json: @days
      end

      # GET /days/1
      def show
        render json: @day
      end

      # POST /days
      def create
        @day = Day.new(day_params)

        if @day.save
          render json: @day, status: :created
        else
          render json: @day.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /days/1
      def update
        if @day.update(day_params)
          render json: @day
        else
          render json: @day.errors, status: :unprocessable_entity
        end
      end

      # DELETE /days/1
      def destroy
        @day.destroy
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_day
        @day = Day.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def day_params
        params.require(:day).permit(:name)
      end
    end
  end
end
